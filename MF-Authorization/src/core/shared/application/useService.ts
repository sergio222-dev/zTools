import { useContainer } from "../../../app/context/container.context";

const useService = <T>(type: symbol) => {
  const container = useContainer();

  if (container === null) throw new Error("Container not initialized");

  return container.get<T>(type);
}

export default useService;
