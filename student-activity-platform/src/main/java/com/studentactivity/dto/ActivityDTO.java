package com.studentactivity.dto;

import java.time.LocalDate;

public class ActivityDTO {

    private Long id;
    private String title;
    private String type;
    private String description;
    private LocalDate date;
    private String venue;
    private String achievement;
    private String certificateUrl;

    // Student info (flattened)
    private Long studentId;
    private String studentName;
    private String studentRollNumber;
    private String studentDepartment;

    public ActivityDTO() {}

    public ActivityDTO(Long id, String title, String type, String description,
                       LocalDate date, String venue, String achievement,
                       String certificateUrl, Long studentId, String studentName,
                       String studentRollNumber, String studentDepartment) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.date = date;
        this.venue = venue;
        this.achievement = achievement;
        this.certificateUrl = certificateUrl;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentRollNumber = studentRollNumber;
        this.studentDepartment = studentDepartment;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public String getAchievement() { return achievement; }
    public void setAchievement(String achievement) { this.achievement = achievement; }

    public String getCertificateUrl() { return certificateUrl; }
    public void setCertificateUrl(String certificateUrl) { this.certificateUrl = certificateUrl; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentRollNumber() { return studentRollNumber; }
    public void setStudentRollNumber(String studentRollNumber) { this.studentRollNumber = studentRollNumber; }

    public String getStudentDepartment() { return studentDepartment; }
    public void setStudentDepartment(String studentDepartment) { this.studentDepartment = studentDepartment; }
}
