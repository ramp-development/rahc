const details = document.querySelectorAll('details');
details.forEach((detail) => {
  const groupName = detail.querySelector('mark').textContent;
  console.group(groupName);
  const tableData = [];
  const rows = detail.querySelectorAll('tr');
  rows.forEach((row) => {
    const name = row.querySelector('td:first-child');
    const location = row.querySelector('td:nth-last-child(2)');
    const id = row.querySelector('td:last-child');

    const link = name.querySelector('a');

    tableData.push({
      name: name ? name.textContent : '',
      link: link ? link.href : '',
      location: location ? location.textContent : '',
      id: id ? id.textContent : '',
    });
  });
  console.table(tableData);
  console.groupEnd(groupName);
});
