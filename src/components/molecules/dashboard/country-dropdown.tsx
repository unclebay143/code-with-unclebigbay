'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewPort,
} from '@hashnode/matrix-ui';
import { Countries } from '@/utils/types';

type SelectCountry = {
  onValueChange: (...event: any[]) => void;
  defaultValue?: string;
  countries: Countries;
};
export const SelectCountry = ({
  countries,
  onValueChange,
  defaultValue,
  ...restOfProps
}: SelectCountry) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...restOfProps}
    >
      <SelectTrigger size="md" shape="rectangle" />
      <SelectContent>
        <SelectViewPort>
          {countries?.map((country, index) => {
            return (
              <SelectItem
                value={country.name.common}
                label={country.name.common}
                key={index}
              />
            );
          })}
        </SelectViewPort>
      </SelectContent>
    </Select>
  );
};
