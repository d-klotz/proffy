import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList: React.FC = () => {

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are our available teachers">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject" 
            label="Subject"
            value={subject}
            onChange={(e) => {setSubject(e.target.value)}}
            options={[
              {value: 'Arts', label: 'Arts'},
              {value: 'Math', label: 'Math'},
              {value: 'Programming', label: 'Programming'},
              {value: 'English', label: 'English'},
              {value: 'Cooking', label: 'Cooking'},
              {value: 'Physics', label: 'Physics'},
              {value: 'Biology', label: 'Biology'}
            ]}
          />
          <Select 
            name="week_day" 
            label="Weekday"
            value={week_day}
            onChange={(e) => {setWeekDay(e.target.value)}}
            options={[
              {value: '0', label: 'Monday'},
              {value: '1', label: 'Thusday'},
              {value: '2', label: 'Wednesday'},
              {value: '3', label: 'Thursday'},
              {value: '4', label: 'Friday'},
              {value: '5', label: 'Saturday'},
              {value: '6', label: 'Sunday'}
            ]}
          />
          <Input 
            type="time" 
            label="Time" 
            name="time"            
            value={time}
            onChange={(e) => {setTime(e.target.value)}}
          />
          
          <button type="submit">Search</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>;
        })}
      </main>
    </div>
  );
}

export default TeacherList;