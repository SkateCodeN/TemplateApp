export default function ChildModules(id, name= "", description="",type ="", order="", properties = {}, showInList=false, value=""){
    const module = {
        id:id,
        name: name,
        description: description,
        type: type,
        order: order,
        properties: properties,
        showInList: showInList,
        value: value
    };

    return module;
}