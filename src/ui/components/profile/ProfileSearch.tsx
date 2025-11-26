import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from "../utility-components/Popover"
  import {
    Command,
    CommandList,
    CommandEmpty,
    CommandInput,
    CommandItem,
  } from "../utility-components/Command"
  import { FC, ReactNode, useState } from "react"
import { Profile } from "@/api/types/profile";
  
  type Props = {
    onSearch:(query:string) => void;
    profiles: Profile[];
    children: (profile:Profile|null) => ReactNode
  }

  export const UserSearchCombobox:FC<Props> = ({ onSearch, profiles, children }) => {
    const [open, setOpen] = useState(false)
    const [chosenProfile, setChosenProfile] = useState<Profile|null>(null);
  
    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <button className="w-full border p-2 rounded">
                <>{chosenProfile ? chosenProfile.name : 'Search user'}</>
            </button>
            </PopoverTrigger>
    
            <PopoverContent className="p-0 w-80">
            <Command>
                <CommandInput
                placeholder="Type a name..."
                onValueChange={onSearch}
                />
    
                <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
    
                {profiles.map((profile) => (
                    <CommandItem
                    key={profile.id}
                    onSelect={() => {
                        setChosenProfile(profile)
                        setOpen(false)
                    }}
                    >
                    {profile.name}
                    </CommandItem>
                ))}
                </CommandList>
            </Command>
            </PopoverContent>
        </Popover>
        {children(chosenProfile)}
      </>
    )
  }
  