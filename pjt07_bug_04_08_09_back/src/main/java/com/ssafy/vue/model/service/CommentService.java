package com.ssafy.vue.model.service;

import java.util.List;

import com.ssafy.vue.model.Comment;

public interface CommentService {

	List<Comment> list(String articleno) throws Exception;

	boolean create(Comment commentDto) throws Exception;

	boolean modify(Comment commentDto) throws Exception;

	boolean delete(int commentNo) throws Exception;

}
