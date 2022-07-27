import { Box } from "@mui/material";
import { CategorySelector } from "./CategorySelector";
import { useAtom } from "jotai";
import { defaultCategoriesAtom } from "../atoms";
import _ from "lodash";

export const DefaultCategory = ({ name }: { name: string }) => {
  const [defaultCategories, setDefaultCategories] = useAtom(
    defaultCategoriesAtom
  );
  return (
    <Box className="flex justify-left gap-4 items-center">
      <Box className="flex-0">{_.capitalize(name)} default category: </Box>
      <Box className="flex-1">
        <CategorySelector
          value={defaultCategories[name] ?? ""}
          onChange={(id) =>
            setDefaultCategories({ ...defaultCategories, [name]: id })
          }
        />
      </Box>
    </Box>
  );
};
