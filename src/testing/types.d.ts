type CustomRender = (
  ui: JSX.Element,
  options: RenderOptions & { providerProps: UserContextType }
) => RenderResult;
