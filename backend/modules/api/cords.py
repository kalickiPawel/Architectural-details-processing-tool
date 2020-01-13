import logger
from flask import make_response, abort
from connect_mongo import ConnectMongoDB
from modules.interp_result import point
import os
import sys

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))


LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))


def read_all():
    """
    This function responds to a request for /api/cords
    with the complete lists of elements to interpolate
    :return:        json string of list of points to interpolation with specific method
    """

    LOG.info('Used read_all method in cords module')

    mongo_var = ConnectMongoDB()
    col = mongo_var.get_collection('coordinates')

    cursor = col.find({})

    def get_points(document):
        return {
            "id_element": document['id'],
            "x_values": document['x_values'],
            "y_values": document['y_values'],
            "interp": document['interp'],
            "method": document['method']
        }

    return [get_points(document) for document in cursor]


def read_one(id_element):
    """
    This function responds to a request for /api/cords/{id_element}
    with one matching element from elements to interpolate
    :param id_element:      id of element to find
    :return:                element matching id
    """

    LOG.info('Used read_one method in cords module')

    mongo_var = ConnectMongoDB()
    col = mongo_var.get_collection('coordinates')

    # Does the person exist in people?
    if col.find_one({"id": id_element}) is not None:
        document = col.find_one({"id": id_element})
        point = {
            "id_element": document['id'],
            "x_values": document['x_values'],
            "y_values": document['y_values'],
            "interp": document['interp'],
            "method": document['method']
        }

    # otherwise, nope, not found
    else:

        LOG.error("Element with id: {id} not found".format(id=id_element))

        abort(
            404, "Element with id: {id} not found".format(id=id_element)
        )

    return point


def create(element):
    """
    This function creates a new element to interpolate
    based on the passed in element data
    :param element:     element to create
    :return:            201 on success, 406 on element exists
    """

    LOG.info('Used create method in cords module')

    mongo_var = ConnectMongoDB()
    col = mongo_var.get_collection('coordinates')

    id_element = element.get("id_coords", None)
    x_values = element.get("x_val", None)
    y_values = element.get("y_val", None)
    method = element.get("method", None)

    # Does the person exist already?
    if col.find_one({"id": id_element}) is None:

        interpolate = point.get_interp_result((x_values, y_values), method)

        result = col.insert_one({
            'id': id_element,
            'x_values': x_values,
            'y_values': y_values,
            'interp': interpolate,
            'method': method
        })
        return make_response(
            "{result} successfully created\n".format(
                result=result.inserted_id), 201
        )

    # Otherwise, they exist, that's an error
    else:

        LOG.error("Points with id {id} already exists".format(id=id_element))

        abort(
            406,
            "Points with id {id} already exists".format(id=id_element),
        )


def update(id_element, element):
    """
    This function updates an existing element to interpolate
    :param id_eleemnt:      id of element to update
    :param element:         element to update
    :return:                updated element id
    """

    LOG.info('Used update method in cords module')

    mongo_var = ConnectMongoDB()
    col = mongo_var.get_collection('coordinates')

    x_values = element.get("x_val", None)
    y_values = element.get("y_val", None)
    method = element.get("method", None)

    # Does the person exist in people?

    if col.find_one({"id": id_element}) is not None:

        interpolate = point.get_interp_result((x_values, y_values), method)

        result = col.update_one({"id": id_element}, {'$set': {
            "x_values": x_values,
            "y_values": y_values,
            'interp': interpolate,
            "method": method
        }})
        if result.modified_count:
            return make_response(
                "{id} successfully modified".format(id=id_element), 201
            )
    else:

        LOG.error("Point with id {id} not found".format(id=id_element))

        abort(
            404, "Point with id {id} not found".format(id=id_element)
        )


def delete(id_element):
    """
    This function deletes a element to interpolate
    :param id_element:      id of eleement to delete
    :return:                200 on successful delete, 404 if not found
    """

    LOG.info('Used delete method in cords module')

    mongo_var = ConnectMongoDB()
    col = mongo_var.get_collection('coordinates')

    if col.find_one({"id": id_element}) is not None:
        document = col.delete_one({"id": id_element})
        if document.deleted_count:
            return make_response(
                "{id} successfully deleted".format(id=id_element), 200
            )
    else:

        LOG.error("Points with id {id} not found".format(id=id_element))

        abort(
            404, "Points with id {id} not found".format(id=id_element)
        )
