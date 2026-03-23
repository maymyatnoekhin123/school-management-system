import { getCurrentYear } from "../api/currentYearAPI";
import { useQuery } from "@tanstack/react-query";

export const useCurrentYear = () => {

     const { isLoading: isCYLoading, isError: isCYError, error: cyError, data: currentYear } = useQuery({
          queryKey : ["current-year"],
          queryFn : getCurrentYear,
     });

     return ({
          isCYLoading,
          isCYError,
          cyError,
          currentYear
     });
}