import { ComponentProps } from "react";
import { Select as GluestackSelect, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@components/ui/select";
import { ChevronDownIcon } from "@components/ui/icon";
	
interface Props extends ComponentProps<typeof GluestackSelect> {
    title?: string;
    isLoading?: boolean;
}

export function Select({ title, ...rest }: Props) {
  return (
    <GluestackSelect {...rest}>
          <SelectTrigger variant="underlined" size="md" >
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop/>
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="UX Research" value="ux" />
              <SelectItem label="Web Development" value="web" />
              <SelectItem
                label="Cross Platform Development Process"
                value="Cross Platform Development Process"
              />
              <SelectItem
                label="UI Designing"
                value="ui"
                isDisabled={true}
              />
              <SelectItem
                label="Backend Development"
                value="backend"
              />
            </SelectContent>
          </SelectPortal>
    </GluestackSelect>
    
    // <FormControl>
    //   <FormControlLabel>
    //     <FormControlLabelText>Escolha o tema</FormControlLabelText>
    //   </FormControlLabel>
    //         <Select
    //            selectedValue={theme === 'light' ? 'Claro' : 'Escuro' }
    //       onValueChange={(value) => handleTheme(value as Theme)}
    //         >
    //   <SelectTrigger variant="outline" size="xl" className="justify-between px-2 border-2 border-primary-500 text-primary-500 rounded-lg">
    //     <SelectInput placeholder="Escolha o tema" className="text-base leading-normal text-primary-500"/>
    //     <SelectIcon className="justify-end text-primary-500" as={ChevronDownIcon} />
    //   </SelectTrigger>
    //   <SelectPortal>
    //     <SelectBackdrop />
    //     <SelectContent className="bg-background-100 border border-primary-500 rounded-lg">
    //       <SelectDragIndicatorWrapper>
    //         <SelectDragIndicator />
    //       </SelectDragIndicatorWrapper>
    //       <SelectItem label="Claro" value='light' />
    //       <SelectItem label="Escuro" value='dark' />
    //     </SelectContent>
    //   </SelectPortal>
    //       </Select>
    //       </FormControl>
  );
}