'use client';

import { useState } from 'react';
import type { SxProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import type { TableHeadCellProps } from 'src/components/table';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  status: 'active' | 'inactive';
}

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'Name' },
  { id: 'subject', label: 'Subject' },
  { id: 'email', label: 'Email' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

const MOCK_TEACHERS: Teacher[] = [
  { id: '1', name: 'John Smith', subject: 'Mathematics', email: 'john.smith@school.edu', status: 'active' },
  { id: '2', name: 'Sarah Johnson', subject: 'Science', email: 'sarah.johnson@school.edu', status: 'active' },
  { id: '3', name: 'Michael Brown', subject: 'English', email: 'michael.brown@school.edu', status: 'inactive' },
  { id: '4', name: 'Emily Davis', subject: 'History', email: 'emily.davis@school.edu', status: 'active' },
  { id: '5', name: 'David Wilson', subject: 'Computer Science', email: 'david.wilson@school.edu', status: 'active' },
];

// ----------------------------------------------------------------------

export function TeacherView() {
  const [teachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (teacherId: string) => {
    console.log('Edit teacher:', teacherId);
  };

  const handleDelete = (teacherId: string) => {
    console.log('Delete teacher:', teacherId);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          mb: 5,
          gap: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ typography: 'h4' }}>Teacher</Box>
        <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
          Add Teacher
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search teacher..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Scrollbar>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align || 'left'}
                    sx={{ typography: 'subtitle2', fontWeight: 600 }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ typography: 'subtitle2' }}>{row.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.subject}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.email}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 1,
                        typography: 'caption',
                        fontWeight: 500,
                        color: row.status === 'active' ? 'success.main' : 'error.main',
                        bgcolor: row.status === 'active' ? 'success.lighter' : 'error.lighter',
                      }}
                    >
                      <Box
                        sx={{
                          mr: 0.75,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'currentColor',
                        }}
                      />
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ gap: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton size="small" onClick={() => handleEdit(row.id)}>
                        <Iconify icon="solar:pen-bold" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(row.id)}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>

        {filteredTeachers.length === 0 && (
          <Box sx={{ py: 8, textAlign: 'center', typography: 'body2', color: 'text.secondary' }}>
            No teachers found
          </Box>
        )}
      </Box>
    </Container>
  );
}