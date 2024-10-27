"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SuggestionCard() {
  const suggestedUsers = [
    { name: "jon_snow", description: "Suggested for you" },
    { name: "sam_will_tarle", description: "Followed by Jorah_mormont" },
    { name: "tyrion_lannister", description: "Followed by jon_snow" },
    { name: "ned_stark", description: "Suggested for you" },
    { name: "daenerys_targaryen", description: "Followed by Jorah_mormont" },
  ];

  return (
    <div className="z-20 text-foreground p-4  overflow-visible flex">
      <div className="max-w-[300px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="" alt="rohang111" />
              <AvatarFallback>RG</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold whitespace-nowrap">rohang111</h2>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                Rohan Ghosh
              </p>
            </div>
          </div>
          <Button className="text-blue-500 hover:text-primary appearance-none no-underline bg-transparent hover:bg-transparent h-4 text-xs">
            Switch
          </Button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-muted-foreground  whitespace-nowrap">
              Suggested for you
            </h3>
            <Button className="text-primary hover:text-muted-foreground appearance-none no-underline bg-transparent hover:bg-transparent h-4 text-xs">
              See All
            </Button>
          </div>
          <ul className="space-y-3 whitespace-nowrap">
            {suggestedUsers.map((user, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={""}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {user.description}
                    </p>
                  </div>
                </div>
                <Button className="text-blue-500 hover:text-primary appearance-none no-underline bg-transparent hover:bg-transparent h-4 text-xs">
                  Follow
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
