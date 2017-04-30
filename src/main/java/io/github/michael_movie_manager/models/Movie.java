package io.github.michael_movie_manager.models;

import io.github.michael_movie_manager.types.MovieFormatEnum;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Movie {

    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @Size(min = 1, max = 50)
    private String title;

    @NotNull
    private MovieFormatEnum format;

    @NotNull
    @Min(1)
    @Max(499)
    private int length;

    @NotNull
    @Min(1801)
    @Max(2099)
    private int releaseYear;

    @Min(1)
    @Max(5)
    private Integer rating = null;
    
    private String username;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public MovieFormatEnum getFormat() {
        return format;
    }

    public void setFormat(MovieFormatEnum format) {
        this.format = format;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
