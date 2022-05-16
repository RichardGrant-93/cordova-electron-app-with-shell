import { MaterialIcon } from "../../../../../vertical-navigation/src/lib/models/materialIcon.model";

export interface NavLink {
    icon?: MaterialIcon,
    text: string,
    route: string
}