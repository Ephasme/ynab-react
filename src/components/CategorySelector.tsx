import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Category } from "ynab";
import { useBudgetDetails } from "../hooks/useBudgetDetails";

export const CategorySelector = ({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (id: string) => void;
}) => {
  const budget = useBudgetDetails();
  const findGroup = (category: Category) => {
    if (category.category_group_id) {
      return budget?.category_groups?.find(
        (group) => group.id === category.category_group_id
      )?.name;
    }
  };

  return (
    <Box className="w-40">
      <FormControl size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          size="small"
          label={label}
          value={value}
          onChange={(x) => {
            onChange(x.target.value as string);
          }}
        >
          {budget?.categories
            ?.filter((x) => !x.hidden && !x.deleted)
            .map((bla) => (
              <MenuItem value={bla.id} key={bla.id}>
                <Box>{findGroup(bla) + " - " + bla.name}</Box>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
