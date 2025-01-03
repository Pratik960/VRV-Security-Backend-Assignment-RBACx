package com.rbac.model.dto.task;

import com.rbac.util.DefaultPagination;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskListRequest {
    @Positive(message = "PerPage will be more than 1")
    @Schema(example = "1",description = "Enter page no to access record")
    private Integer page = DefaultPagination.page;

    @Positive(message = "page will be more than 1")
    @Schema(example = "5",description = "Enter total no of records to be displayed per page")
    private Integer perPage = DefaultPagination.perPage;

    @Schema(example = "newtask",description = "search task by name")
    private String search;

    @Schema(example = "ASC")
    private String sort;

    @Schema(example = "1")
    private Integer userId;

    @Schema(example = "CREATED",description = "status of task")
    private String status;

    @Schema(example = "title", description = "sort the data by title")
    private String sortBy;

    @Schema(example = "2024-01-01", description = "provide start date for filtering records")
    private String startDate;

    @Schema(example = "2024-04-17", description = "provide end date for filtering records")
    private String endDate;

    @Schema(example = "true", description = "want pagination or not")
    private boolean isPageable;
}
