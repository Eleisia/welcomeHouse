package com.ssafy.vue.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.vue.model.Comment;
import com.ssafy.vue.model.service.CommentService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/comment")
@CrossOrigin("*")
public class CommentRestController {

	private static final Logger logger = LoggerFactory.getLogger(CommentRestController.class);

	@Autowired
	private CommentService commentService;

	@ApiOperation(value = "article에 해당하는 댓글 목록을 반환한다.", response = List.class)
	@GetMapping("/{articleno}")
	public ResponseEntity<?> listComment(@PathVariable("articleno") String articleno) throws Exception{
		logger.debug("listComment - 호출");

		try {
			List<Comment> listComment = commentService.list(articleno);
			for(Comment it : listComment) {
				System.out.println(it.toString());
			}
			return new ResponseEntity<List<Comment>>(listComment, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "새로운 게시글을 입력한다.", response = String.class)
	@PostMapping
	public ResponseEntity<?> createComment(@RequestBody Comment commentDto) {
		logger.debug("createComment - 호출");
		try {
			boolean isWrite = commentService.create(commentDto);

			if (isWrite) {
				return new ResponseEntity<Void>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "글번호가 commentNo에 해당하는 댓글을 수정한다.", response = String.class)
	@PutMapping("/{commentNo}")
	public ResponseEntity<?> modifyComment(@PathVariable("commentNo") int commentNo, @RequestBody Comment commentDto) {
		logger.debug("modifyComment - 호출");

		try {
			commentDto.setCommentNo(commentNo);
			boolean isModify = commentService.modify(commentDto);

			if (isModify) {
				return new ResponseEntity<Void>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "글번호가 commentNo에 해당하는 댓글을 삭제한다.", response = String.class)
	@DeleteMapping("/{commentNo}")
	public ResponseEntity<?> deleteComment(@PathVariable("commentNo") int commentNo) {
		logger.debug("deleteComment - 호출");

		try {
			boolean isDelete = commentService.delete(commentNo);

			if (isDelete) {
				return new ResponseEntity<Void>(HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
