export function shouldForwardProp(predicate) {
  return props => props.filter(predicate);
}
