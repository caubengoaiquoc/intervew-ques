# When should you use higher order components and pure components?
(< 150 words and/or < 20 LOC example, excl. headers)

# Answer
- Higher order components
    1. Need to share logic across multiple components without having to rewrite it, used by: redux (connect), react-router (withRouter), material-ui all using hoc (withStyle),
- Pure components 
    1. Avoid re-rendering cycles of component when its props and state are not changed
    2. The state and props of component are immutable
    3. You don’t plan to implement your own shouldComponentUpdate lifecycle method.