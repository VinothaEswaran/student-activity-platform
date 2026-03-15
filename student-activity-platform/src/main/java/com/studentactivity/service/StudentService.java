package com.studentactivity.service;

import com.studentactivity.model.Student;
import com.studentactivity.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired private StudentRepository studentRepository;

    public List<Student> getAllStudents() { return studentRepository.findAll(); }
    public Student getStudentById(Long id) { return studentRepository.findById(id).orElseThrow(); }
    public Student saveStudent(Student s) { return studentRepository.save(s); }
    public Student updateStudent(Long id, Student s) {
        s.setId(id);
        return studentRepository.save(s);
    }
    public void deleteStudent(Long id) { studentRepository.deleteById(id); }
    public List<Student> searchByName(String name) { return studentRepository.findByNameContainingIgnoreCase(name); }
    public List<Student> getByDepartment(String dept) { return studentRepository.findByDepartment(dept); }
}