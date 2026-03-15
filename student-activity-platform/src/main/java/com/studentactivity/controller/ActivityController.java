package com.studentactivity.controller;

import com.studentactivity.model.Activity;
import com.studentactivity.model.Student;
import com.studentactivity.repository.StudentRepository;
import com.studentactivity.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    @Autowired private ActivityService activityService;
    @Autowired private StudentRepository studentRepository;

    @GetMapping
    public List<Activity> getAll(
            @RequestParam(required = false) String type) {
        if (type != null) return activityService.getByType(type);
        return activityService.getAllActivities();
    }

    @GetMapping("/student/{studentId}")
    public List<Activity> getByStudent(@PathVariable Long studentId) {
        return activityService.getActivitiesByStudent(studentId);
    }

    @PostMapping
    public Activity create(@RequestBody Map<String, Object> payload) {
        Activity a = new Activity();
        a.setTitle((String) payload.get("title"));
        a.setType((String) payload.get("type"));
        a.setDescription((String) payload.get("description"));
        a.setVenue((String) payload.get("venue"));
        a.setAchievement((String) payload.get("achievement"));
        a.setCertificateUrl((String) payload.get("certificateUrl"));
        if (payload.get("date") != null)
            a.setDate(java.time.LocalDate.parse(
                (String) payload.get("date")));
        Long studentId = Long.valueOf(
            payload.get("studentId").toString());
        Student student = studentRepository.findById(studentId)
            .orElseThrow();
        a.setStudent(student);
        return activityService.saveActivity(a);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id,
            @RequestBody Activity a) {
        return activityService.updateActivity(id, a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        activityService.deleteActivity(id);
    }
}