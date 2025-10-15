import { useEffect, useState } from "react";

/* type Props<T> = {
    getData: () => T[]
    setData: (item:T) => void
} */

type DataGetter<T> = () => T[];
type DataSetter<T> = (item:T) => void;


export function useExpenseData<T>(getData: DataGetter<T>, setData:DataSetter<T>): [T[], (arg:T) => void] {
    const data = getData();
    const [state, setState] = useState<T[]>([]);
  
    useEffect(() => {
      if (data) setState(data);
    }, [data.length]);
  
    const addItem = (item: T) => {
        setData(item);
    };
  
    return [state, addItem]
}