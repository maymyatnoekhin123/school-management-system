import { useQuery } from "@tanstack/react-query";
import { getAllClassrooms } from "../api/classroomAPI";


export const useClassrooms = () => {

     const {isLoading : isCLoading,isError : isCError , error : cError,
          data : classrooms
     } = useQuery({
          queryKey : ["classrooms"],
          queryFn : getAllClassrooms
     });

     return ({
          isCLoading,
          isCError,
          cError,
          classrooms
     });
}