package com.studentactivity.controller;

import com.studentactivity.repository.ActivityRepository;
import com.studentactivity.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired private StudentRepository studentRepository;
    @Autowired private ActivityRepository activityRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", studentRepository.count());
        stats.put("totalActivities", activityRepository.count());
        stats.put("academicActivities",
            activityRepository.findByType("Academic").size());
        stats.put("sportsActivities",
            activityRepository.findByType("Sports").size());
        stats.put("culturalActivities",
            activityRepository.findByType("Cultural").size());
        stats.put("technicalActivities",
            activityRepository.findByType("Technical").size());
        return stats;
    }
}