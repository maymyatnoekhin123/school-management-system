import { getAllTeacherCounts } from "../api/teacherAPI";
import { useQuery } from "@tanstack/react-query";


export const useTeacherCount = () => {

     const {isLoading : isTLoading,isError : isTError,error : tError , data : teacherCount} = useQuery({
          queryKey : ["teacher-count"],
          queryFn : getAllTeacherCounts,
          enabled: !!localStorage.getItem("token"),
     });

     return ({
          isTLoading,
          isTError,
          tError,
          teacherCount
     });
} 