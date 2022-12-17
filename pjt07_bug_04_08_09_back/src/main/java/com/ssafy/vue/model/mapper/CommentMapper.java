package com.ssafy.vue.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.vue.model.Comment;

@Mapper
public interface CommentMapper {

	List<Comment> list(String articleno) throws SQLException;

	int create(Comment commentDto) throws SQLException;

	int modify(Comment commentDto) throws SQLException;

	int delete(int commentNo) throws SQLException;

}
