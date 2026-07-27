const students = [];

let nextId = 1;

export function getAllStudents() {
    return students;
}

export function addStudent(student) {
    student.id = nextId++;
    students.push(student);

    return student;
}

export function findStudentById(id) {
    return students.find(student => student.id === id);
}

export function updateStudentById(id, updatedData) 
{
    const student = findStudentById(id);

    if (!student) {
        return null;
    }

    Object.assign(student, updatedData);

    return student;
}

export function deleteStudentById(id) {
    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return false;
    }

    students.splice(index, 1);

    return true;
}