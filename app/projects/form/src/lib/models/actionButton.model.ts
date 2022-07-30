import { Button } from "@library/button/src/lib/button/button.component";
import { MaterialIcon } from "@library/vertical-navigation/src/lib/models/materialIcon.model";

export interface ActionButton extends Button{
    outputForm?: number;
}