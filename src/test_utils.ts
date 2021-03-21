export const buildActionWithDeps = <Deps, Action>(
  buildAction: (deps: Deps) => Action,
  buildMockDeps: () => Deps
) => {
  const deps = buildMockDeps();
  return { action: buildAction(deps), deps };
};
