import { useContainer } from "../../../app/context/container.context";

const useService = <T>(type: symbol) => {
  const context = useContainer();

  if (context === null) throw new Error("Container not initialized");

  return context.get<T>(type);
}

export default useService;
