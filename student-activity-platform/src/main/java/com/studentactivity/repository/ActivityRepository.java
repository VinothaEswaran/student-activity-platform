package com.studentactivity.repository;

import com.studentactivity.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByStudentId(Long studentId);
    List<Activity> findByType(String type);
    long countByStudentId(Long studentId);
}