import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mosque_list_axios () {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
            // CSS 확인용 임시 API
        );
        setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>LOADING...</div>;
  if (error) return <div>ERR!</div>;
  if (!users) return null;
  return (
    <div>
      {users.map(user => (
        <div className="mosque_list_cell">
            <div key={user.id}>
                <button className="mosque_list_name">
                 {user.username}
                </button>
                 <div className="mosque_list_pos">
                 {user.name}
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}

export default Mosque_list_axios;