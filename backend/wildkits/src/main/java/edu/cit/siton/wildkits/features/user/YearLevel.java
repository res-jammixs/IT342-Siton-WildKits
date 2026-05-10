package edu.cit.siton.wildkits.features.user;

public enum YearLevel {
    FIRST_YEAR("1st Year"),
    SECOND_YEAR("2nd Year"),
    THIRD_YEAR("3rd Year"),
    FOURTH_YEAR("4th Year"),
    FIFTH_YEAR("5th Year"),
    GRADUATE("Graduate");

    private final String displayName;

    YearLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}