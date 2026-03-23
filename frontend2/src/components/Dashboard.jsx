import { useApp } from "../ThemeApp";
export default function Dashboard()
{
     const {auth} = useApp();
     console.log(auth);
}