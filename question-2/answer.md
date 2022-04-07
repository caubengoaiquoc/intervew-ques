# When should we and should we not use Redux?

# Answer

- When to use
    1. When there's multiple components need to use the same state, and the state is updated frequently
    2. Use one common component that use everywhere like notifications, alert modals
    3. Props need to be passed through a lot of components
    4. Helping maintance page's state, helping keeping page's state like search/ field input or expanded / collapsed 
- When not to use
    1. When your team already got a way to manage state thoughout components
    2. Small project/ codebase don't have a lot of freature/ component or sharing state cross components
    3. The page is way too big and consist a lot of part, because redux is single-store so all the state is stored in one store, might come to place that there's way too many state leads to bundle size become too big, its gonna make the page goes lagg => use context api
