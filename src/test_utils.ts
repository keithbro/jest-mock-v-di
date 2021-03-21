export const inject = <DependenciesFactory, FunctionFactory>(
  buildFunction: (dependencies: DependenciesFactory) => FunctionFactory,
  buildDependencies: () => DependenciesFactory
) => () => {
  const dependencies = buildDependencies();
  return { execute: buildFunction(dependencies), dependencies };
};
