export const columns = [
    { id: 'location', label: 'Location', minWidth: 170 },
    { id: 'address', label: 'Address', minWidth: 300 },
    {
      id: 'phone',
      label: 'Phone no.',
      minWidth: 10,
      maxWidth: 12,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    }
  ];