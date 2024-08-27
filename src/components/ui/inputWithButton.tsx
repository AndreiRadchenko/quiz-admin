import { Arrow } from "@radix-ui/react-tooltip"
import { Button } from "./button"
import { Input } from "./input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { IoMdInformationCircleOutline } from "react-icons/io";

type Props = {
  btnName: string,
  tooltip: string
}

export function InputWithButton({ btnName, tooltip }: Props) {
  return (
    <div className="flex align-top gap-0">
      <div className="flex max-w-sm items-center space-x-2 " >
        <Input type="number" placeholder="0" className="w-20" defaultValue={0} />
        <Button type="submit">{btnName}</Button>
      </div>
      {
        tooltip
        &&
        <TooltipProvider >
          < Tooltip >
            <TooltipTrigger className="h-fit ml-1">
              <IoMdInformationCircleOutline size={20} className="" />
            </TooltipTrigger>
            <TooltipContent className="border-input">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip >
        </TooltipProvider >
      }
    </div>
  )
}

