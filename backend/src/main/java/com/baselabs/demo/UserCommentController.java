package com.baselabs.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
@CrossOrigin
public class UserCommentController {

    @Autowired
    private UserCommentRepository userCommentRepository;

    @GetMapping("/")
    public List<UserComment> getUsersComments() {
        return userCommentRepository.findAll();
    }

    @GetMapping("/{id}")
    public UserComment getUserComment(@PathVariable Integer id) {
        return userCommentRepository.findById(id).orElse(null);
    }

    @PostMapping("/")
    public UserComment saveUserComment(@RequestBody UserComment user) {
        return userCommentRepository.save(user);
    }

    @PutMapping("/")
    public UserComment updateUser(@RequestBody UserComment user) {

        UserComment newUser = userCommentRepository.findById(user.getId()).orElse(null);
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPhone(user.getPhone());
        newUser.setAddress(user.getAddress());
        newUser.setCountry(user.getCountry());
        newUser.setComment(user.getComment());

        return userCommentRepository.save(newUser);
    }

    @DeleteMapping("/{id}")
    public Integer deleteUserComment(@PathVariable Integer id) {
        userCommentRepository.deleteById(id);
        return id;
    }

}
