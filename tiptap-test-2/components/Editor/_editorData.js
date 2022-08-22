export const justBtns = [
    {
        icon: "mdi-minus",
        title: "Wstaw poziomą linię",
        name: "setHorizontalRule",
    },
    {
        icon: "mdi-arrow-left-bottom",
        title: "Wstaw załamanie linii",
        name: "setHardBreak",
    },
    {
        icon: "mdi-undo",
        title: "Do tyłu",
        name: "undo",
    },
    {
        icon: "mdi-redo",
        title: "Do przodu",
        name: "redo",
    },
    {
        icon: "mdi-broom",
        title: "Wyczyść stylowanie",
        name: "unsetAllMarks",
    },
    {
        icon: "mdi-table-plus",
        title: "Wstaw tabele",
        name: "insertTable",
    },
]

export const btnsToEditTable = [
    {
        name: "addColumnBefore",
        icon: "mdi-table-column-plus-before",
        title: "Wstaw kolumne przed",
    },
    {
        name: "addColumnAfter",
        icon: "mdi-table-column-plus-after",
        title: "Wstaw kolumne za",
    },
    {
        name: "deleteColumn",
        icon: "mdi-table-column-remove",
        title: "Usuń kolumne",
    },
    {
        name: "addRowBefore",
        icon: "mdi-table-row-plus-before",
        title: "Dodaj wiersz przed"
    },
    {
        name: "addRowAfter",
        icon: "mdi-table-row-plus-after",
        title: "Dodaj wiersz za"
    },
    {
        name: "deleteRow",
        icon: "mdi-table-row-remove",
        title: "Usuń wiersz"
    },
    {
        name: "deleteTable",
        icon: "mdi-table-remove",
        title: "Usuń tabele",
    },
    {
        name: "mergeCells",
        icon: "mdi-table-merge-cells",
        title: "Scal komórki",
    },
    {
        name: "splitCell",
        icon: "mdi-table-split-cell",
        title: "Rozdziel komórki",
    },
    {
        name: "toggleHeaderColumn",
        icon: "mdi-tag-arrow-left",
        title: "Pierwsza kolumna jak nagłówkowa",
    },
    {
        name: "toggleHeaderRow",
        icon: "mdi-tag-arrow-up",
        title: "Pierwszy wiersz jak nagłówkowy",
    },
    {
        name: "toggleHeaderCell",
        icon: "mdi-tag",
        title: "Komórka nagłówkowa"
    },
    {
        name: "goToPreviousCell",
        icon: "mdi-arrow-left",
        title: "Poprzednia komórka",
    },
    {
        name: "goToNextCell",
        icon: "mdi-arrow-right",
        title: "Następna komórka",
    },
]

export const btnsWithClassIsActive = [
    {
        icon: "mdi-format-bold",
        title: "Pogrubienie",
        name: "toggleBold",
        class: "bold",
    },
    {
        icon: "mdi-format-italic",
        title: "Kursywa",
        name: "toggleItalic",
        class: "italic",
    },
    {
        icon: "mdi-format-strikethrough",
        title: "Przekreślenie",
        name: "toggleStrike",
        class: "strike",
    },
    {
        icon: "mdi-format-paragraph",
        title: "Paragraf",
        name: "setParagraph",
        class: "paragraph",
    },
    {
        icon: "mdi-format-list-bulleted",
        title: "Lista punktowana",
        name: "toggleBulletList",
        class: "bulletList",
    },
    {
        icon: "mdi-format-list-numbered",
        title: "Lista numerowana",
        name: "toggleOrderedList",
        class: "orderedList",
    },
]

export const headingsBtns = [
    {
        icon: "mdi-format-header-1",
        title: "H1",
        name: "toggleHeading",
        level: 1,
    },
    {
        icon: "mdi-format-header-2",
        title: "H2",
        name: "toggleHeading",
        level: 2,
    },
    {
        icon: "mdi-format-header-3",
        title: "H3",
        name: "toggleHeading",
        level: 3,
    },
    {
        icon: "mdi-format-header-4",
        title: "H4",
        name: "toggleHeading",
        level: 4,
    },
    {
        icon: "mdi-format-header-5",
        title: "H5",
        name: "toggleHeading",
        level: 5,
    },
    {
        icon: "mdi-format-header-6",
        title: "H6",
        name: "toggleHeading",
        level: 6,
    },
]
