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

// 🏗 بتن‌ها
export function useConcreteList() {
  const { data, isLoading } = useQuery({
    queryKey: ["concrete-list"],
    queryFn: getConcreteList,
  });

  return {
    concreteList: data || [],
    isLoadingConcreteList: isLoading,
  };
}

export function useConcretePouringTypeList() {
  const { data, isLoading } = useQuery({
    queryKey: ["concrete-pouring-type-list"],
    queryFn: getConcretePouringTypeList,
  });

  return {
    concretePouringTypeList: data || [],
    isLoadingConcretePouringTypeList: isLoading,
  };
}

export function useConcreteResistanceClassList() {
  const { data, isLoading } = useQuery({
    queryKey: ["concrete-resistance-class-list"],
    queryFn: getConcreteResistanceClassList,
  });

  return {
    concreteResistanceClassList: data || [],
    isLoadingConcreteResistanceClassList: isLoading,
  };
}

// 🛠 پمپ‌ها
export function usePumpList(type = "parent") {
  const { data, isLoading } = useQuery({
    queryKey: ["pump-list", type], // 👈 وابسته به type
    queryFn: () => getPumpList(type),
  });

  return {
    pumpList: data || [],
    isLoadingPumpList: isLoading,
  };
}

export function useSubPumpList(pumpId) {
  const { data, isLoading } = useQuery({
    queryKey: ["sub-pump-list", pumpId],
    queryFn: () => getSubPumpList(pumpId),
    enabled: !!pumpId,
  });

  return {
    subPumpList: data || [],
    isLoadingSubPumpList: isLoading,
  };
}

// ⚙️ ویبراتورها
export function useVibratorList() {
  const { data, isLoading } = useQuery({
    queryKey: ["vibrator-list"],
    queryFn: getVibratorList,
  });

  return {
    vibratorList: data || [],
    isLoadingVibratorList: isLoading,
  };
}

export function useSubVibratorList(vibratorId) {
  const { data, isLoading } = useQuery({
    queryKey: ["sub-vibrator-list", vibratorId],
    queryFn: () => getSubVibratorList(vibratorId),
    enabled: !!vibratorId,
  });

  return {
    subVibratorList: data || [],
    isLoadingSubVibratorList: isLoading,
  };
}
