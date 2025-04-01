package learn.organizer.data;

import learn.organizer.data.Mappers.ActivityMapper;
import learn.organizer.models.Activity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import learn.organizer.models.Activity;
import java.util.List;

@Repository
public class ActivityJdbcTemplateRepository implements ActivityRepository{
    private JdbcTemplate jdbcTemplate;
    private ActivityMapper activityMapper;

    public ActivityJdbcTemplateRepository(JdbcTemplate jdbcTemplate, ActivityMapper activityMapper){
        this.jdbcTemplate=jdbcTemplate;
        this.activityMapper=activityMapper;
    }

    @Override
    public List<Activity> getAllActivities() {
        String sql = "select * from activity";
        return jdbcTemplate.query(sql, activityMapper);
    }

    @Override
    public boolean addActivity(Activity activity) {
        String sql="insert into activity" +
                "Values()";
        return jdbcTemplate.update(sql)>0;
    }

    @Override
    public boolean deleteActivity(int id) {
        String sql="delete from activity" +
                "where activityId=?";
        return jdbcTemplate.update(sql,id)>0;
    }

    @Override
    public boolean editActivity(Activity activity) {
        return false;
    }
}
