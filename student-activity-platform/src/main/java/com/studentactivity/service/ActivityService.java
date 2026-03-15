package com.studentactivity.service;

import com.studentactivity.model.Activity;
import com.studentactivity.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActivityService {
    @Autowired private ActivityRepository activityRepository;

    public List<Activity> getAllActivities() { return activityRepository.findAll(); }
    public List<Activity> getActivitiesByStudent(Long studentId) { return activityRepository.findByStudentId(studentId); }
    public Activity saveActivity(Activity a) { return activityRepository.save(a); }
    public Activity updateActivity(Long id, Activity a) { a.setId(id); return activityRepository.save(a); }
    public void deleteActivity(Long id) { activityRepository.deleteById(id); }
    public long countByStudent(Long studentId) { return activityRepository.countByStudentId(studentId); }
    public List<Activity> getByType(String type) { return activityRepository.findByType(type); }
}