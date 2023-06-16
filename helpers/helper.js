const validateFilters = (filters) => {
  const validatedFilters = {};

  try {
    filters = JSON.parse(filters);
  } catch (e) {
    return;
  }

   for (const key in filters) {
    switch (key) {
      case 'BE':
      case 'level':
        if (typeof filters[key] === 'number' && filters[key] >= 0) {
          validatedFilters[key] = filters[key];
        }
        break;

      default:
        break;
    }
  }

  return validatedFilters;
}

module.exports = { validateFilters };