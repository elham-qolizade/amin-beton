import { useQuery } from "@tanstack/react-query";
import {
  getConcreteList,
  getConcretePouringTypeList,
  getConcreteResistanceClassList,
  getPumpList,
  getSubPumpList,
  getVibratorList,
  getSubVibratorList,
} from "../services/apiUserPanel";

// Initial Order Form
export function useConcreteList() {
  const {
    data: concreteList,
    isLoading: isLoadingConcreteList,
    error,
  } = useQuery({
    queryKey: ["concrete-list"],
    queryFn: getConcreteList,
  });

  return { concreteList, isLoadingConcreteList, error };
}

export function useConcretePouringTypeList() {
  const {
    data: concretePouringTypeList,
    isLoading: isLoadingConcretePouringTypeList,
    error,
  } = useQuery({
    queryKey: ["concrete-pouring-type-list"],
    queryFn: getConcretePouringTypeList,
  });

  return { concretePouringTypeList, isLoadingConcretePouringTypeList, error };
}

export function useConcreteResistanceClassList() {
  const {
    data: concreteResistanceClassList,
    isLoading: isLoadingConcreteResistanceClassList,
    error,
  } = useQuery({
    queryKey: ["concrete-resistance-class-list"],
    queryFn: getConcreteResistanceClassList,
  });

  return {
    concreteResistanceClassList,
    isLoadingConcreteResistanceClassList,
    error,
  };
}

////////////////////////////////////////////////////////////////////////////////////
// Pumps Order Form

export function usePumpList(type = "parent") {
  const {
    data: pumpList,
    isLoading: isLoadingPumpList,
    error,
  } = useQuery({
    queryKey: ["pump-list"],
    queryFn: () => getPumpList(type),
  });

  return {
    pumpList,
    isLoadingPumpList,
    error,
  };
}

export function useSubPumpList(pumpId) {
  const {
    data: subPumpList,
    isLoading: isLoadingSubPumpList,
    error,
  } = useQuery({
    queryKey: ["sub-pump-list", pumpId],
    queryFn: () => getSubPumpList(pumpId),
    enabled: !!pumpId,  // فقط وقتی pumpId مقدار دارد اجرا شود
  });
////////////////////////////////////////////////////////////////////////////////////
// Vibrator Order Form

export function useVibratorList() {
  const {
    data: vibratorList,
    isLoading: isLoadingVibratorList,
    error,
  } = useQuery({
    queryKey: ["vibrator-list"],
    queryFn: () => getVibratorList(),
  });

  return {
    vibratorList,
    isLoadingVibratorList,
    error,
  };
}

export function useSubVibratorList(vibratorId) {
  const {
    data: subVibratorList,
    isLoading: isLoadingSubVibratorList,
    error,
  } = useQuery({
    queryKey: ["sub-vibrator-list", vibratorId],
    queryFn: () => getSubVibratorList(vibratorId),
  });

  return {
    subVibratorList,
    isLoadingSubVibratorList,
    error,
  };
}
