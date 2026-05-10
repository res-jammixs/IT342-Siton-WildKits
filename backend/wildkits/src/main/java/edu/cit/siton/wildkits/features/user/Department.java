package edu.cit.siton.wildkits.features.user;

public enum Department {
    COMPUTER_SCIENCE("Computer Science"),
    INFORMATION_TECHNOLOGY("Information Technology"),
    COMPUTER_ENGINEERING("Computer Engineering"),
    ELECTRONICS_ENGINEERING("Electronics Engineering"),
    ELECTRICAL_ENGINEERING("Electrical Engineering"),
    CIVIL_ENGINEERING("Civil Engineering"),
    MECHANICAL_ENGINEERING("Mechanical Engineering"),
    ARCHITECTURE("Architecture"),
    BUSINESS_ADMINISTRATION("Business Administration"),
    ACCOUNTANCY("Accountancy"),
    NURSING("Nursing"),
    EDUCATION("Education"),
    ARTS_AND_SCIENCES("Arts and Sciences"),
    HOSPITALITY_MANAGEMENT("Hospitality Management"),
    TOURISM_MANAGEMENT("Tourism Management"),
    OTHER("Other");

    private final String displayName;

    Department(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}