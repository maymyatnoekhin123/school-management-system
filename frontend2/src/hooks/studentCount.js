import { useQuery } from "@tanstack/react-query";
import { getAllStudentCounts } from "../api/studentAPI";

export const useStudentCount = () => {

     const {isLoading : isSLoading,error : sError,isError: isSError,data : studentCount} = useQuery({
          queryKey : ["student-count"],
          queryFn : getAllStudentCounts,
          enabled: !!localStorage.getItem("token")
     });

     return({
          isSLoading,
          isSError,
          sError,
          studentCount
     });
}