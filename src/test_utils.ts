export const inject = <Dependencies, FunctionFactory>(
  buildFunction: (dependencies: Dependencies) => FunctionFactory,
  buildDependencies: () => Dependencies
) => (dependencies = buildDependencies()) => ({
  execute: buildFunction(dependencies),
  dependencies,
});
