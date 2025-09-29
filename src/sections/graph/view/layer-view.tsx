import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Layer {
  name: string;
  color: number;
  nodes: number;
  position: number;
  nodeObjects: THREE.Mesh[];
}

interface Connection {
  start: THREE.Mesh;
  end: THREE.Mesh;
}

const LayerView: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const knowledgeGraphGroupRef = useRef<THREE.Group | null>(null);
  const connectionGroupRef = useRef<THREE.Group | null>(null);
  const connectionsRef = useRef<Connection[]>([]);
  const layerGroupsRef = useRef<THREE.Group[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.002);
  const [layerSpacing, setLayerSpacing] = useState(4);
  
  const animationRef = useRef<number | undefined>(undefined);
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  const isMouseDown = useRef(false);

  // Initialize Three.js scene
  const initScene = () => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 20, 60);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 10, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    scene.add(new THREE.PointLight(0x4a90e2, 0.5, 100));

    // Main graph group
    const knowledgeGraphGroup = new THREE.Group();
    scene.add(knowledgeGraphGroup);
    knowledgeGraphGroupRef.current = knowledgeGraphGroup;

    // Knowledge graph data
    const layers: Layer[] = [
      { name: '课程', color: 0x4a90e2, nodes: 1, position: 8, nodeObjects: [] },
      { name: '能力圈谱', color: 0x00bcd4, nodes: 15, position: 4, nodeObjects: [] },
      { name: '问题圈谱', color: 0xffc107, nodes: 50, position: 0, nodeObjects: [] },
      { name: '知识圈谱', color: 0x4caf50, nodes: 300, position: -4, nodeObjects: [] }
    ];
    
    const nodeTypeColors = [0xff7f50, 0x87cefa, 0x32cd32, 0xffd700, 0x6a5acd, 0xda70d6];
    const layerGroups: THREE.Group[] = [];
    
    // Create layers and nodes
    layers.forEach((layer, index) => {
      const group = new THREE.Group();
      group.position.y = layer.position;
      
      const planeSize = 18;
      const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
      const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a, transparent: true, opacity: 0.3, side: THREE.DoubleSide,
        emissive: layer.color, emissiveIntensity: 0.05
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      group.add(plane);
      
      const edgeGeometry = new THREE.EdgesGeometry(planeGeometry);
      const edgeMaterial = new THREE.LineBasicMaterial({ 
        color: layer.color, linewidth: 2, transparent: true, opacity: 0.5 
      });
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      edges.rotation.x = -Math.PI / 2;
      group.add(edges);
      
      // Create nodes
      const nodeRadius = Math.max(0.08, 0.35 - index * 0.06);
      for (let i = 0; i < layer.nodes; i++) {
        const randomColor = nodeTypeColors[Math.floor(Math.random() * nodeTypeColors.length)];
        const nodeMaterial = new THREE.MeshPhongMaterial({
          color: randomColor, emissive: randomColor, emissiveIntensity: 0.4
        });
        const node = new THREE.Mesh(new THREE.SphereGeometry(nodeRadius, 16, 16), nodeMaterial);
        
        if (layer.nodes === 1) {
          node.position.set(0, 0.2, 0);
        } else {
          node.position.set(
            (Math.random() - 0.5) * (planeSize * 0.9),
            0.2,
            (Math.random() - 0.5) * (planeSize * 0.9)
          );
        }
        group.add(node);
        layer.nodeObjects.push(node);
      }
      
      // Layer name sprite
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 64;
      const context = canvas.getContext('2d');
      if (context) {
        context.font = 'Bold 24px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.fillText(`${layer.name} (${layer.nodes})`, 128, 40);
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
        sprite.position.set(-planeSize/2 - 2, 0, 0);
        sprite.scale.set(4, 1, 1);
        group.add(sprite);
      }
      
      layerGroups.push(group);
      knowledgeGraphGroup.add(group);
    });
    
    layerGroupsRef.current = layerGroups;

    // Create connections
    const connections: Connection[] = [];
    const connectionGroup = new THREE.Group();
    knowledgeGraphGroup.add(connectionGroup);
    connectionGroupRef.current = connectionGroup;

    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x666666, transparent: true, opacity: 0.2
    });

    for (let i = 0; i < layers.length - 1; i++) {
      const parentNodes = layers[i].nodeObjects;
      const childNodes = layers[i + 1].nodeObjects;
      
      parentNodes.forEach(parentNode => {
        const connectionProbability = (layers[i+1].nodes > 100) ? 0.03 : 0.25;
        childNodes.forEach(childNode => {
          if (Math.random() < connectionProbability) {
            connections.push({ start: parentNode, end: childNode });
          }
        });
      });
    }
    
    connectionsRef.current = connections;

    // Update connections function
    const updateConnections = () => {
      if (!connectionGroupRef.current || !knowledgeGraphGroupRef.current) return;
      
      while(connectionGroupRef.current.children.length) { 
        connectionGroupRef.current.remove(connectionGroupRef.current.children[0]); 
      }
      
      const startPos = new THREE.Vector3();
      const endPos = new THREE.Vector3();

      connections.forEach(conn => {
        conn.start.getWorldPosition(startPos);
        conn.end.getWorldPosition(endPos);
        
        knowledgeGraphGroupRef.current!.worldToLocal(startPos);
        knowledgeGraphGroupRef.current!.worldToLocal(endPos);

        const geometry = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
        const line = new THREE.Line(geometry, connectionMaterial);
        connectionGroupRef.current!.add(line);
      });
    };
    
    updateConnections();

    // Particle system
    const particleCount = 800;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < particleCount; i++) {
      positions.push((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60);
    }
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({
      size: 0.08, color: 0x555555, transparent: true, opacity: 0.5
    }));
    scene.add(particles);
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (knowledgeGraphGroupRef.current) {
        if (rotationEnabled) {
          knowledgeGraphGroupRef.current.rotation.y += rotationSpeed;
        }
        
        knowledgeGraphGroupRef.current.rotation.y += (targetRotationY.current - knowledgeGraphGroupRef.current.rotation.y) * 0.05;
        knowledgeGraphGroupRef.current.rotation.x += (targetRotationX.current - knowledgeGraphGroupRef.current.rotation.x) * 0.05;
      }
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0002;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
  };

  // Event handlers
  useEffect(() => {
    const handleMouseDown = () => isMouseDown.current = true;
    const handleMouseUp = () => isMouseDown.current = false;
    const handleMouseMove = (event: MouseEvent) => {
      if (isMouseDown.current) {
        targetRotationY.current += (event.clientX - (window.innerWidth / 2)) / 100 * 0.005;
        targetRotationX.current += (event.clientY - (window.innerHeight / 2)) / 100 * 0.005;
      }
    };
    const handleWheel = (event: WheelEvent) => {
      if (cameraRef.current) {
        cameraRef.current.position.z += event.deltaY * 0.02;
        cameraRef.current.position.z = Math.max(10, Math.min(50, cameraRef.current.position.z));
      }
    };
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('wheel', handleWheel);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Layer spacing effect
  useEffect(() => {
    if (layerGroupsRef.current) {
      layerGroupsRef.current.forEach((group, index) => {
        group.position.y = 8 - index * layerSpacing;
      });
      
      // Update connections
      if (connectionGroupRef.current && knowledgeGraphGroupRef.current && connectionsRef.current) {
        while(connectionGroupRef.current.children.length) { 
          connectionGroupRef.current.remove(connectionGroupRef.current.children[0]); 
        }
        
        const startPos = new THREE.Vector3();
        const endPos = new THREE.Vector3();
        const connectionMaterial = new THREE.LineBasicMaterial({
          color: 0x666666, transparent: true, opacity: 0.2
        });

        connectionsRef.current.forEach(conn => {
          conn.start.getWorldPosition(startPos);
          conn.end.getWorldPosition(endPos);
          
          knowledgeGraphGroupRef.current!.worldToLocal(startPos);
          knowledgeGraphGroupRef.current!.worldToLocal(endPos);

          const geometry = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
          const line = new THREE.Line(geometry, connectionMaterial);
          connectionGroupRef.current!.add(line);
        });
      }
    }
  }, [layerSpacing]);

  // Initialize scene on mount
  useEffect(() => {
    initScene();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current && canvasRef.current) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  const resetView = () => {
    if (cameraRef.current && knowledgeGraphGroupRef.current) {
      cameraRef.current.position.set(15, 10, 20);
      cameraRef.current.lookAt(0, 0, 0);
      knowledgeGraphGroupRef.current.rotation.set(0, 0, 0);
      targetRotationX.current = 0;
      targetRotationY.current = 0;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000' }}>
      <div ref={canvasRef} />
      
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: 15,
        borderRadius: 8,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 100,
        color: '#fff'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: 14 }}>控制面板</h3>
        
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, color: '#aaa' }}>
            旋转速度
          </label>
          <input
            type="range"
            min="0"
            max="0.02"
            step="0.001"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            style={{ width: 150 }}
          />
        </div>
        
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 5, fontSize: 12, color: '#aaa' }}>
            层间距
          </label>
          <input
            type="range"
            min="1"
            max="8"
            step="0.5"
            value={layerSpacing}
            onChange={(e) => setLayerSpacing(parseFloat(e.target.value))}
            style={{ width: 150 }}
          />
        </div>
        
        <div>
          <button
            onClick={() => setRotationEnabled(!rotationEnabled)}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
              marginRight: 5
            }}
          >
            {rotationEnabled ? '暂停旋转' : '开始旋转'}
          </button>
          <button
            onClick={resetView}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12
            }}
          >
            重置视图
          </button>
        </div>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        background: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 8,
        fontSize: 12,
        color: '#aaa',
        backdropFilter: 'blur(10px)'
      }}>
        鼠标左键：旋转 | 鼠标右键：平移 | 滚轮：缩放
      </div>
    </div>
  );
};

export default LayerView;