export const inject = <DependenciesFactory, FunctionFactory>(
  buildFunction: (dependencies: DependenciesFactory) => FunctionFactory,
  buildDependencies: () => DependenciesFactory
) => (dependencies = buildDependencies()) => ({
  execute: buildFunction(dependencies),
  dependencies,
});
