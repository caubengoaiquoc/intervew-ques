# What is the difference between Props vs State, when do you use each?
(< 100 words and/or < 20 LOC example, excl. headers)

# Answer

* Differences
 1. State is internal and controlled one component while Props come from an another component
 2. State is mutable, Props is Immutable (cannot be modified)

* Usecases
 1. State
    - Represents dynamic UI data (product name/ user name/ infomation/ ...)
    - Controlls input components's value such as text field, combobox, etc
 2. Props
    - Is passed from Parent to Child component for some specifics uses, one well-knowed case is passing redux state from store / router history to component as props